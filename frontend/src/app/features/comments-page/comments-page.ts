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

@Component({
  selector: 'app-comments-page',
  imports: [SearchbarComponent, NgClass, PageableComponent, DatePipe],
  templateUrl: './comments-page.html',
  styleUrl: './comments-page.css',
})
export class CommentsPage {

  private incidentsService = inject(IncidentsService);
  private modalService = inject(ModalService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private commentsService = inject(CommentsService);

  paramId: string | null = '';
  paginaAtual: number = 0;
  tamanhoPagina: number = 20;
  totalItens: number = 0;
  totalPaginas: number = 0;
  incident = signal<any>(null);
  commentsList = signal<CommentModel[]>([]);
  incidetStatus: string = '';

  ngOnInit() {
    const data = this.route.snapshot.data['incidentData'];
    this.incident.set(data);

    this.route.paramMap.subscribe(params => {
      const id: any = params.get('id');

      if (id) {
        this.paramId = id;
        this.findAllComments(id);
      }
    });
  }

  findAllComments(id: string) {
    this.commentsService.findAllByIncidentsId(id, this.paginaAtual, this.tamanhoPagina).subscribe({
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

  incidentById() {

    if (!this.paramId) {
      this.router.navigate(['**'],);
      return;
    }

    this.incidentsService.findById(this.paramId).subscribe({
      next: (res) => { },
      error: (err) => {
        this.router.navigate(['**'],);
        console.error(err);
      }
    })
  }

  tratamentoString(palavra: string): string {
    return capitalize(palavra);
  }

  formatarData(data: Date) {
    return converterData(data);
  }
}
