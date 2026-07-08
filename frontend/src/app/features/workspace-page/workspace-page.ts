import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Incidents } from '../../core/models/incidents-model';
import { IncidentsService } from '../../core/services/incidents-service';
import { ModalService } from '../../core/services/modal-service';
import { converterData, formatarTempoDecorrido } from '../../core/utils/tratamento-datas';
import { capitalize } from '../../core/utils/capitalize';
import { PageableComponent } from "../../shared/pageable-component/pageable-component";
import { stringToArray } from '../../core/utils/stringToArray';

@Component({
  selector: 'app-workspace-page',
  imports: [ReactiveFormsModule, NgClass, PageableComponent],
  templateUrl: './workspace-page.html',
  styleUrl: './workspace-page.css',
})
export class WorkspacePage implements OnInit {

  private incidentsService = inject(IncidentsService);
  private modalService = inject(ModalService);

  incidentsList = signal<Incidents[]>([]);

  btnController = true;
  incidetStatus: string = '';

  paginaAtual: number = 0;
  tamanhoPagina: number = 20;
  totalItens: number = 0;
  totalPaginas: number = 0;

  incident = new FormGroup({
    id: new FormControl({ value: '', disabled: true }, [Validators.required]),
    titulo: new FormControl('', [Validators.required, Validators.maxLength(120)]),
    descricao: new FormControl('', [Validators.maxLength(5000)]),
    prioridade: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    responsavel: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]),
    tags: new FormControl('', [Validators.required]),
    dataAbertura: new FormControl({ value: '', disabled: true }, [Validators.required]),
    dataAtualizacao: new FormControl({ value: '', disabled: true }, [Validators.required])
  });

  ngOnInit(): void {

    this.incidentsFindAll();
  }


  incidentsFindAll(): void {

    this.incidentsService.findAll(this.paginaAtual, this.tamanhoPagina).subscribe({
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


  buscarNovaPagina(novaPagina: number) {
    console.log(`O HTML pediu para ir para a página: ${novaPagina}`);
    this.paginaAtual = novaPagina;
    this.incidentsFindAll();
  }

  formatarTempo(data: Date): any {
    return formatarTempoDecorrido(data);
  }

  selectIncident(selectedIncident: any) {
    const formValues = { ...selectedIncident };

    if (selectedIncident.tags && Array.isArray(selectedIncident.tags)) {
      formValues.tags = selectedIncident.tags.join(', ');
    }

    formValues.dataAbertura = converterData(formValues.dataAbertura);
    formValues.dataAtualizacao = converterData(formValues.dataAtualizacao);

    this.incident.patchValue(formValues);
    this.btnController = false;
  }

  resetForm(): void {
    this.incident.reset();
    this.btnController = true;
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

  tratamentoString(palavra: string): string {
    return capitalize(palavra);
  }

  incidentsUpdate(): any {

    const formValues: any =  this.incident.getRawValue() ;

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
}