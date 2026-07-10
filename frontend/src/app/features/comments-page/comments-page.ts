import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentsService } from '../../core/services/incidents-service';
import { ModalService } from '../../core/services/modal-service';
import { SearchbarComponent } from "../../shared/searchbar-component/searchbar-component";
import { PageableComponent } from "../../shared/pageable-component/pageable-component";
import { DatePipe, NgClass } from '@angular/common';
import { capitalize } from '../../core/utils/capitalize';
import { CommentModel } from '../../core/models/comments-model';
import { CommentsService } from '../../core/services/comments-service';
import { converterData } from '../../core/utils/tratamento-datas';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments-page',
  imports: [SearchbarComponent, NgClass, PageableComponent, DatePipe, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './comments-page.html',
  styleUrl: './comments-page.css',
})
export class CommentsPage {

  private modalService = inject(ModalService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private commentsService = inject(CommentsService);

  paramId: string | null = '';
  paginaAtual: number = 0;
  tamanhoPagina: number = 10;
  totalItens: number = 0;
  totalPaginas: number = 0;
  incident = signal<any>(null);
  commentsList = signal<CommentModel[]>([]);
  incidetStatus: string = '';
  dataAtual: Date = new Date();
  termoDaBusca: string | null = null;

  comment = new FormGroup({
    autor: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    mensagem: new FormControl('', [Validators.required, Validators.maxLength(2000)])
  });

  filtrosForm = new FormGroup({
    sort: new FormControl<string | null>(null)
  });

  ngOnInit() {
    const data = this.route.snapshot.data['incidentData'];
    this.incident.set(data);

    this.route.paramMap.subscribe(params => {
      const id: any = params.get('id');

      if (id) {
        this.paramId = id;
        
        this.findAllComments(this.paramId);

        this.filtrosForm.valueChanges.subscribe(() => {
          this.paginaAtual = 0;
          this.findAllComments(this.paramId);
        });
        
      } else {
        this.router.navigate(['**']);
      }
    });
  }

  findAllComments(id: any) {

    const sort = this.filtrosForm.get('sort')?.value;

    this.commentsService.findAllByIncidentsId(
      id,
      sort,
      this.termoDaBusca,
      this.paginaAtual,
      this.tamanhoPagina).subscribe({
        next: (res: any) => {

          const data = res.content;
          this.commentsList.set(data);

          if (res.page) {
            this.paginaAtual = res.page.number;
            this.totalItens = res.page.totalElements;
            this.totalPaginas = res.page.totalPages;
          }
        },
        error: (err) => {
          this.modalService.exibir({
            tipo: "erro",
            titulo: err.error?.type || "Erro",
            mensagem: err.error?.message || "Ocorreu um erro inesperado."

          });
          console.error('Erro na requisição de comentarios:', err);
        }
      });
  }

  receberBusca(termo: string) {
    this.termoDaBusca = termo;
    this.paginaAtual = 0;
    this.findAllComments(this.paramId);
  }

  buscarNovaPagina(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.findAllComments(this.paramId);
  }

  tratamentoString(palavra: string): string {
    return capitalize(palavra);
  }

  formatarData(data: Date) {
    return converterData(data);
  }

  createComment() {

    if (!this.paramId) {
      this.modalService.exibir({
        tipo: "erro",
        titulo: "Erro",
        mensagem: "O id do incidente informado é nulo ou inválido."
      });
      return;
    }

    this.modalService.exibir({
      tipo: 'loading',
      titulo: '',
      mensagem: 'Carregando...'
    });

    const formsValues = this.comment.getRawValue();

    this.commentsService.createComment(this.paramId, formsValues).subscribe({
      next: (res) => {

        this.modalService.exibir({
          tipo: "sucesso",
          titulo: "Sucesso",
          mensagem: "Comentário criado com êxito!"
        });

        this.comment.reset();
        this.findAllComments(this.paramId);
      },
      error: (err) => {
        this.modalService.exibir({
          tipo: "erro",
          titulo: err.error?.type || "Erro ao comentar",
          mensagem: err.error?.message || "Não foi possível enviar seu comentário."
        });
      }
    });
  }
}
