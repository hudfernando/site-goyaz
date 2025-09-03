import { api } from '@/http/api';
import { HTTPError } from 'ky';
import { NextRequest, NextResponse } from "next/server";

interface EmailData {
  Type: string;
  Name?: string;
  Email: string;
  Phone?: string;
  ResumeBase64?: string;
  ResumeFileName?: string;
  ResumeContentType?: string;
  AlvaraBase64?: string;
  AlvaraFileName?: string;
  AlvaraContentType?: string;
  CrfBase64?: string;
  CrfFileName?: string;
  CrfContentType?: string;
  ContratoBase64?: string;
  ContratoFileName?: string;
  ContratoContentType?: string;
  Document1Base64?: string;
  Document1FileName?: string;
  Document1ContentType?: string;
  Document2Base64?: string;
  Document2FileName?: string;
  Document2ContentType?: string;
  Document3Base64?: string;
  Document3FileName?: string;
  Document3ContentType?: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const type = formData.get('type') as string;

    // Validação geral para type
    if (!type) {
      console.error('Campo type ausente.');
      return NextResponse.json(
        { status: 400 }
      );
    }

    const jsonData: EmailData = {
      Type: type,
      Email: ''
    };

    // Lógica específica baseada no type
    if (type === 'work') {
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const resume = formData.get('resume') as File | null;

      // Validar os campos obrigatórios
      if (!name || !email) {
        console.error('Campos obrigatórios ausentes para work:', { name, email });
        return NextResponse.json(
          { error: 'Campos obrigatórios ausentes.', details: 'Name e email são obrigatórios para work.' },
          { status: 400 }
        );
      }

      // Validar anexo
      if (!resume) {
        console.error('Anexo de currículo obrigatório ausente.');
        return NextResponse.json(
          { error: 'Currículo é obrigatório.', details: 'Um arquivo de currículo deve ser fornecido.' },
          { status: 400 }
        );
      }

      // Validar formato do e-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.error('Formato de e-mail inválido:', email);
        return NextResponse.json(
          { error: 'Formato de e-mail inválido.', details: 'O e-mail fornecido não é válido.' },
          { status: 400 }
        );
      }

      jsonData.Name = name;
      jsonData.Email = email;

      // Converter o arquivo para base64
      if (resume) {
        const arrayBuffer = await resume.arrayBuffer();
        jsonData.ResumeBase64 = Buffer.from(arrayBuffer).toString('base64');
        jsonData.ResumeFileName = resume.name;
        jsonData.ResumeContentType = resume.type || 'application/octet-stream';
        console.log('Anexo resume processado:', { fileName: resume.name, contentType: resume.type });
      }
    } else if (type === 'new-client') {
      const email = formData.get('email') as string;
      const phone = formData.get('phone') as string;
      const alvara = formData.get('alvara') as File | null;
      const crf = formData.get('crf') as File | null;
      const contrato = formData.get('contrato') as File | null;

      // Validar os campos obrigatórios
      if (!email || !phone) {
        console.error('Campos obrigatórios ausentes para new-client:', { email, phone });
        return NextResponse.json(
          { error: 'Campos obrigatórios ausentes.', details: 'Email e phone são obrigatórios para new-client.' },
          { status: 400 }
        );
      }

      // Validar anexos obrigatórios
      if (!alvara || !crf || !contrato) {
        console.error('Anexos obrigatórios ausentes para new-client.');
        return NextResponse.json(
          { error: 'Anexos obrigatórios ausentes.', details: 'Alvará, CRF e contrato social são obrigatórios para new-client.' },
          { status: 400 }
        );
      }

      // Validar formato do e-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.error('Formato de e-mail inválido:', email);
        return NextResponse.json(
          { error: 'Formato de e-mail inválido.', details: 'O e-mail fornecido não é válido.' },
          { status: 400 }
        );
      }

      jsonData.Email = email;
      jsonData.Phone = phone;

      // Converter os arquivos para base64
      if (alvara) {
        const arrayBuffer = await alvara.arrayBuffer();
        jsonData.AlvaraBase64 = Buffer.from(arrayBuffer).toString('base64');
        jsonData.AlvaraFileName = alvara.name;
        jsonData.AlvaraContentType = alvara.type || 'application/octet-stream';
        console.log('Anexo alvara processado:', { fileName: alvara.name, contentType: alvara.type });
      }
      if (crf) {
        const arrayBuffer = await crf.arrayBuffer();
        jsonData.CrfBase64 = Buffer.from(arrayBuffer).toString('base64');
        jsonData.CrfFileName = crf.name;
        jsonData.CrfContentType = crf.type || 'application/octet-stream';
        console.log('Anexo crf processado:', { fileName: crf.name, contentType: crf.type });
      }
      if (contrato) {
        const arrayBuffer = await contrato.arrayBuffer();
        jsonData.ContratoBase64 = Buffer.from(arrayBuffer).toString('base64');
        jsonData.ContratoFileName = contrato.name;
        jsonData.ContratoContentType = contrato.type || 'application/octet-stream';
        console.log('Anexo contrato processado:', { fileName: contrato.name, contentType: contrato.type });
      }
    } else if (type === 'documentation') {
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const phone = formData.get('phone') as string;
      const document1 = formData.get('document1') as File | null;
      const document2 = formData.get('document2') as File | null;
      const document3 = formData.get('document3') as File | null;

      // Validar os campos obrigatórios
      if (!name || !email || !phone) {
        console.error('Campos obrigatórios ausentes para documentation:', { name, email, phone });
        return NextResponse.json(
          { error: 'Campos obrigatórios ausentes.', details: 'Name, email e phone são obrigatórios para documentation.' },
          { status: 400 }
        );
      }

      // Validar pelo menos um documento
      if (!document1 && !document2 && !document3) {
        console.error('Pelo menos um documento é obrigatório para documentation.');
        return NextResponse.json(
          { error: 'Pelo menos um documento é obrigatório.' },
          { status: 400 }
        );
      }

      // Validar formato do e-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.error('Formato de e-mail inválido:', email);
        return NextResponse.json(
          { error: 'Formato de e-mail inválido.', details: 'O e-mail fornecido não é válido.' },
          { status: 400 }
        );
      }

      jsonData.Name = name;
      jsonData.Email = email;
      jsonData.Phone = phone;

      // Converter os arquivos para base64, se presentes
      if (document1) {
        const arrayBuffer = await document1.arrayBuffer();
        jsonData.Document1Base64 = Buffer.from(arrayBuffer).toString('base64');
        jsonData.Document1FileName = document1.name;
        jsonData.Document1ContentType = document1.type || 'application/octet-stream';
        console.log('Anexo document1 processado:', { fileName: document1.name, contentType: document1.type });
      }
      if (document2) {
        const arrayBuffer = await document2.arrayBuffer();
        jsonData.Document2Base64 = Buffer.from(arrayBuffer).toString('base64');
        jsonData.Document2FileName = document2.name;
        jsonData.Document2ContentType = document2.type || 'application/octet-stream';
        console.log('Anexo document2 processado:', { fileName: document2.name, contentType: document2.type });
      }
      if (document3) {
        const arrayBuffer = await document3.arrayBuffer();
        jsonData.Document3Base64 = Buffer.from(arrayBuffer).toString('base64');
        jsonData.Document3FileName = document3.name;
        jsonData.Document3ContentType = document3.type || 'application/octet-stream';
        console.log('Anexo document3 processado:', { fileName: document3.name, contentType: document3.type });
      }
    } else {
      return NextResponse.json(
        { error: 'Tipo inválido.', details: 'Tipo deve ser "work", "new-client" ou "documentation".' },
        { status: 400 }
      );
    }

    console.log('Dados a serem enviados ao backend:', jsonData);

    // Enviar os dados para a API backend como JSON
    const response = await api
      .post('Email/Anexo', {
        json: jsonData,
      })
      .json();

    console.log('Dados enviados para a API backend com sucesso:', response);
    return NextResponse.json({ success: true, message: "Email enviado com sucesso!" });
  } catch (error) {
    console.error('Erro na API Route de envio de e-mail:', error);
    if (error instanceof HTTPError) {
      const errorResponse = await error.response.text();
      console.error('Detalhes do erro da API backend:', errorResponse);
      return NextResponse.json(
        { error: 'Erro ao enviar para a API backend.', details: errorResponse || 'Sem detalhes adicionais' },
        { status: error.response.status }
      );
    }
    return NextResponse.json(
      { error: 'Erro interno do servidor.', details: (error as Error).message },
      { status: 500 }
    );
  }
}