import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void
  {
    this.formulario = this.formBuilder.group
    ({
      conteudo: ['', Validators.compose([Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/)])],
      autoria: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      modelo: ['modelo1'],
      favorito: [false]
    })
  }

  editarPensamento()
  {
    if (this.formulario.valid)
    {
      this.service.criar(this.formulario.value).subscribe(() =>
      {
        this.router.navigate(['/listarPensamento']);
      })
    }
  }

  cancel()
  {
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao(): string
  {
    if (this.formulario.valid)
    {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}
