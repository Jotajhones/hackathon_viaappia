import { Component, inject, OnInit, signal } from '@angular/core';
import { Incidents } from '../../core/models/incidents-model';
import { IncidentsService } from '../../core/services/incidents-service'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { converterData, formatarTempoDecorrido } from '../../core/utils/tratamento-datas';
import { ModalService } from '../../core/services/modal-service';
import { NgClass } from '@angular/common';
import { delay } from 'rxjs';



@Component({
  selector: 'app-workspace-page',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './workspace-page.html',
  styleUrl: './workspace-page.css',
})
export class WorkspacePage implements OnInit {

  private incidentsService = inject(IncidentsService);
  private modalService = inject(ModalService);

  incidentsList = signal<Incidents[]>([]);

  btnController = true;

  incident = new FormGroup({

    id: new FormControl({ value: '', disabled: true }, [
      Validators.required
    ]),

    titulo: new FormControl('', [
      Validators.required,
      Validators.maxLength(120)
    ]),

    descricao: new FormControl('', [
      Validators.maxLength(5000)
    ]),

    prioridade: new FormControl('', [
      Validators.required
    ]),

    status: new FormControl('', [
      Validators.required
    ]),

    responsavel: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(255)
    ]),

    tags: new FormControl('', [Validators.required]),

    dataAbertura: new FormControl({ value: '', disabled: true }, [
      Validators.required
    ]),

    dataAtualizacao: new FormControl({ value: '', disabled: true }, [
      Validators.required
    ])
  });


  ngOnInit(): void {
    this.incidentsFindAll();
  }

  incidentsFindAll(): void {
    this.incidentsService.findAll().subscribe({
      next: (res: any) => {
        const data = res.content;
        return this.incidentsList.set(data);
      },
      error: (err) => {
        this.modalService.exibir({
          tipo: "erro",
          titulo: "Falha de conexão",
          mensagem: "Não foi possivel se comunicar com o serviço que fornece os dados."
        })
        console.error(err)
      }
    });
  }

  formatarTempo(data: Date): any {
    return formatarTempoDecorrido(data);
  };

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

    if (formValues.tags && typeof formValues.tags === 'string') {

      formValues.tags = formValues.tags
        .split(',')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag !== '');
    }


    this.incidentsService.create(formValues).pipe(delay(3000)).subscribe({
      next: (res) => {
        this.modalService.exibir({
          tipo: "sucesso",
          titulo: "Sucesso",
          mensagem: "Incidente criado com êxito!"
        });

        this.resetForm();
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
}

