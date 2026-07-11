import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Incidents } from '../../core/models/incidents-model';
import { IncidentsService } from '../../core/services/incidents-service';
import { ModalService } from '../../core/services/modal-service';
import { StatsService } from '../../core/services/stats-service';
import { dateConverter } from '../../core/utils/tratamento-datas';
import { stringToArray } from '../../core/utils/stringToArray';
import { PageableComponent } from "../../shared/pageable-component/pageable-component";
import { SearchbarComponent } from "../../shared/searchbar-component/searchbar-component";
import { CardIncidentComponent } from "../../shared/card-incident-component/card-incident-component";

@Component({
  selector: 'app-workspace-page',
  imports: [
    ReactiveFormsModule,
    NgClass,
    PageableComponent,
    SearchbarComponent,
    CardIncidentComponent
  ],
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
      this.recarregarWorkspace(true, false);
    });

    this.recarregarWorkspace(false, false);
  }

  recarregarWorkspace(voltarParaInicio: boolean = false, limparFormulario: boolean = false) {
    if (limparFormulario) {
      this.resetForm();
    }
    
    if (voltarParaInicio) {
      this.paginaAtual = 0;
    }

    this.incidentsFindAll();
    this.statsService.loadStats();
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
      error: (err) => this.modalService.exibirErro(err, "Falha de conexão", "Não foi possível se comunicar com o serviço que fornece os dados.")
    });
  }

  incidentsCreate() {
    this.modalService.exibir({ tipo: 'loading', titulo: '', mensagem: 'Carregando...' });

    const formValues: any = { ...this.incident.value };
    formValues.tags = stringToArray(formValues.tags);

    this.incidentsService.create(formValues).subscribe({
      next: () => {
        this.modalService.exibir({ tipo: "sucesso", titulo: "Sucesso", mensagem: "Incidente criado com êxito!" });
        this.recarregarWorkspace(true, true);
      },
      error: (err) => this.modalService.exibirErro(err)
    });
  }

  incidentsUpdate(): any {
    this.modalService.exibir({ tipo: 'loading', titulo: '', mensagem: 'Carregando...' });

    const formValues: any = this.incident.getRawValue();
    formValues.tags = stringToArray(formValues.tags);

    this.incidentsService.update(formValues).subscribe({
      next: () => {
        this.modalService.exibir({ tipo: "sucesso", titulo: "Sucesso", mensagem: "Incidente atualizado com êxito!" });
        this.recarregarWorkspace(true, true);
      },
      error: (err) => this.modalService.exibirErro(err)
    });
  }

  incidentDelete(): any {
    this.modalService.exibir({ tipo: 'loading', titulo: '', mensagem: 'Carregando...' });

    const formValues = this.incident.getRawValue();

    this.incidentsService.delete(formValues.id).subscribe({
      next: () => {
        this.modalService.exibir({ tipo: "sucesso", titulo: "Sucesso", mensagem: "Incidente deletado com êxito!" });
        this.recarregarWorkspace(true, true);
      },
      error: (err) => this.modalService.exibirErro(err)
    });
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
    this.recarregarWorkspace(true, false);
  }

  getNewPage(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.recarregarWorkspace(false, false);
  }

  goToCommentsPageById(id: string) {
    this.router.navigate(['/comments', id]);
  }
}