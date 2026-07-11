import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SearchbarComponent } from "../../shared/searchbar-component/searchbar-component";
import { PageableComponent } from "../../shared/pageable-component/pageable-component";
import { ModalService } from '../../core/services/modal-service';
import { CommentsService } from '../../core/services/comments-service';
import { CommentModel } from '../../core/models/comments-model';
import { capitalize } from '../../core/utils/capitalize';
import { CardCommentComponent } from '../../shared/card-comment-component/card-comment-component';

@Component({
  selector: 'app-comments-page',
  imports: [
    SearchbarComponent, 
    NgClass, 
    PageableComponent,  
    ReactiveFormsModule,
    CardCommentComponent
  ],
  templateUrl: './comments-page.html',
  styleUrl: './comments-page.css',
})
export class CommentsPage implements OnInit {

  private modalService = inject(ModalService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private commentsService = inject(CommentsService);

  incident = signal<any>(null);
  commentsList = signal<CommentModel[]>([]);

  paramId: string | null = '';
  termoDaBusca: string | null = null;
  paginaAtual: number = 0;
  tamanhoPagina: number = 10;
  totalItens: number = 0;
  totalPaginas: number = 0;

  incidetStatus: string = '';
  dataAtual: Date = new Date();

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
      this.tamanhoPagina
    ).subscribe({
      next: (res: any) => {
        const data = res.content;
        this.commentsList.set(data);

        if (res.page) {
          this.paginaAtual = res.page.number;
          this.totalItens = res.page.totalElements;
          this.totalPaginas = res.page.totalPages;
        }
      },

      error: (err) => this.modalService.exibirErro(err)
    });
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

    this.modalService.exibir({ tipo: 'loading', titulo: '', mensagem: 'Carregando...' });

    const formsValues = this.comment.getRawValue();

    this.commentsService.createComment(this.paramId, formsValues).subscribe({
      next: () => {
        this.modalService.exibir({ tipo: "sucesso", titulo: "Sucesso", mensagem: "Comentário criado com êxito!" });
        this.comment.reset();
        this.findAllComments(this.paramId);
      },
      error: (err) => this.modalService.exibirErro(err, "Erro ao comentar", "Não foi possível enviar seu comentário.")
    });
  }

  searchReceiver(termo: string) {
    this.termoDaBusca = termo;
    this.paginaAtual = 0;
    this.findAllComments(this.paramId);
  }

  getNewPage(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.findAllComments(this.paramId);
  }

  beautyString(palavra: string): string {
    return capitalize(palavra);
  }
}