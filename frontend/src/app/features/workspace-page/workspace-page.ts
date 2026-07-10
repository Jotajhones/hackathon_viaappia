import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Incidents } from '../../core/models/incidents-model';
import { IncidentsService } from '../../core/services/incidents-service';
import { ModalService } from '../../core/services/modal-service';
import { StatsService } from '../../core/services/stats-service';
import { getAwaistTime, dateConverter } from '../../core/utils/tratamento-datas';
import { capitalize } from '../../core/utils/capitalize';
import { stringToArray } from '../../core/utils/stringToArray';
import { PageableComponent } from "../../shared/pageable-component/pageable-component";
import { SearchbarComponent } from "../../shared/searchbar-component/searchbar-component";

@Component({
  selector: 'app-workspace-page',
  imports: [ReactiveFormsModule, NgClass, PageableComponent, SearchbarComponent, DatePipe],
  templateUrl: './workspace-page.html',
  styleUrl: './workspace-page.css',
})
export class WorkspacePage implements OnInit {

  private incidentsService = inject(IncidentsService);
  private modalService = inject(ModalService);
  private router = inject(Router);
  private statsService = inject(StatsService);

  incidentsList = signal<Incidents[]>([]);

  termoDaBusca: string | null = null;
  btnController = true;
  incidetStatus: string = '';
  paginaAtual: number = 0;
  tamanhoPagina: number = 10;
  totalItens: number = 0;
  totalPaginas: number = 0;
  dataAtual = new Date();
  stats: any;

  incident = new FormGroup({
    id: new FormControl({ value: '', disabled: true }, [Validators.required]),
    titulo: new FormControl('', [Validators.required, Validators.maxLength(120)]),
    descricao: new FormControl('', [Validators.maxLength(5000)]),
    prioridade: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    responsavel: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]),
    tags: new FormControl(''),
    dataAbertura: new FormControl({ value: '', disabled: true }, [Validators.required]),
    dataAtualizacao: new FormControl({ value: '', disabled: true }, [Validators.required])
  });

  filtrosForm = new FormGroup({
    status: new FormControl<string | null>(null),
    prioridade: new FormControl<string | null>(null),
    sort: new FormControl<string | null>(null)
  });

  ngOnInit(): void {
    this.filtrosForm.valueChanges.subscribe(() => {
      this.paginaAtual = 0;
      this.incidentsFindAll();
      this.findStats();
    });

    this.incidentsFindAll();
    this.findStats();
  }

  incidentsFindAll(): void {
    const status = this.filtrosForm.get('status')?.value;
    const prioridade = this.filtrosForm.get('prioridade')?.value;
    const sort = this.filtrosForm.get('sort')?.value;

    this.incidentsService.findWithFilters(
      sort,
      status,
      prioridade,
      this.termoDaBusca,
      this.paginaAtual,
      this.tamanhoPagina
    ).subscribe({
      next: (res: any) => {
        const data = res.content;
        this.incidentsList.set(data);

        if (res.page) {
          this.paginaAtual = res.page.number;
          this.totalItens = res.page.totalElements;
          this.totalPaginas = res.page.totalPages;
        }
      },
      error: (err) => {
        this.modalService.exibir({
          tipo: "erro",
          titulo: "Falha de conexão",
          mensagem: "Não foi possivel se comunicar com o serviço que fornece os dados."
        });
        console.error('Erro na requisição de incidentes:', err);
      }
    });
  }

  findStats() {
    this.statsService.findStats().subscribe({
      next: (res) => {
        this.stats = res;
      },
      error: (err) => {
        this.modalService.exibir({
          tipo: "erro",
          titulo: err.error?.type || "Erro",
          mensagem: err.error?.message || "Ocorreu um erro inesperado."
        });
        console.error(err);
      }
    });
  }

  incidentsCreate() {
    this.modalService.exibir({
      tipo: 'loading',
      titulo: '',
      mensagem: 'Carregando...'
    });

    const formValues: any = { ...this.incident.value };
    formValues.tags = stringToArray(formValues.tags);

    this.incidentsService.create(formValues).subscribe({
      next: (res) => {
        this.modalService.exibir({
          tipo: "sucesso",
          titulo: "Sucesso",
          mensagem: "Incidente criado com êxito!"
        });

        this.resetForm();
        this.paginaAtual = 0;
        this.incidentsFindAll();
        this.findStats();
      },
      error: (err) => {
        this.modalService.exibir({
          tipo: "erro",
          titulo: err.error?.type || "Erro",
          mensagem: err.error?.message || "Ocorreu um erro inesperado."
        });
        console.error(err);
      }
    });
  }

  incidentsUpdate(): any {
    this.modalService.exibir({
      tipo: 'loading',
      titulo: '',
      mensagem: 'Carregando...'
    });

    const formValues: any = this.incident.getRawValue();
    formValues.tags = stringToArray(formValues.tags);

    this.incidentsService.update(formValues).subscribe({
      next: (res) => {
        this.modalService.exibir({
          tipo: "sucesso",
          titulo: "Sucesso",
          mensagem: "Incidente atualizado com êxito!"
        });

        this.resetForm();
        this.paginaAtual = 0;
        this.incidentsFindAll();
        this.findStats();
      },
      error: (err) => {
        this.modalService.exibir({
          tipo: "erro",
          titulo: err.error?.type || "Erro",
          mensagem: err.error?.message || "Ocorreu um erro inesperado."
        });
        console.error(err);
      }
    });
  }

  incidentDelete(): any {
    this.modalService.exibir({
      tipo: 'loading',
      titulo: '',
      mensagem: 'Carregando...'
    });

    const formValues = this.incident.getRawValue();

    this.incidentsService.delete(formValues.id).subscribe({
      next: (res) => {
        this.modalService.exibir({
          tipo: "sucesso",
          titulo: "Sucesso",
          mensagem: "Incidente deeletado com êxito!"
        });

        this.resetForm();
        this.paginaAtual = 0;
        this.incidentsFindAll();
        this.findStats();
      },
      error: (err) => {
        this.modalService.exibir({
          tipo: "erro",
          titulo: err.error?.type || "Erro",
          mensagem: err.error?.message || "Ocorreu um erro inesperado."
        });
        console.error(err);
      }
    })
  }

  selectIncident(selectedIncident: any) {
    const formValues = { ...selectedIncident };

    if (selectedIncident.tags && Array.isArray(selectedIncident.tags)) {
      formValues.tags = selectedIncident.tags.join(', ');
    }

    formValues.dataAbertura = dateConverter(formValues.dataAbertura);
    formValues.dataAtualizacao = dateConverter(formValues.dataAtualizacao);

    this.incident.patchValue(formValues);
    this.btnController = false;
  }

  resetForm(): void {
    this.incident.reset();
    this.btnController = true;
  }

  searchReceiver(termo: string) {
    this.termoDaBusca = termo;
    this.paginaAtual = 0;
    this.incidentsFindAll();
  }

  getNewPage(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.incidentsFindAll();
  }

  beautyTime(data: Date): any {
    return getAwaistTime(data);
  }

  beautyString(palavra: string): string {
    return capitalize(palavra);
  }

  goToCommentsPageById(id: string) {
    this.router.navigate(['/comments', id]);
  }
}