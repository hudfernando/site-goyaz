import { api } from '@/http/api';
import { HTTPError } from 'ky';
import { NextRequest, NextResponse } from "next/server";

interface NewClientData {
  Type: string;
  Email: string;
  Phone: string;
  AlvaraBase64?: string;
  AlvaraFileName?: string;
  AlvaraContentType?: string;
  CrfBase64?: string;
  CrfFileName?: string;
  CrfContentType?: string;
  ContratoBase64?: string;
  ContratoFileName?: string;
  ContratoContentType?: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const type = formData.get('type') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const alvara = formData.get('alvara') as File | null;
    const crf = formData.get('crf') as File | null;
    const contrato = formData.get('contrato') as File | null;

    // Validar os campos obrigatórios
    if (!type || type !== 'new-client') {
      console.error('Tipo inválido ou ausente:', type);
      return NextResponse.json(
        { error: 'Tipo inválido.', details: 'O tipo deve ser "new-client".' },
        { status: 400 }
      );
    }

    if (!email || !phone) {
      console.error('Campos obrigatórios ausentes:', { email, phone });
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes.', details: 'Email e phone são obrigatórios.' },
        { status: 400 }
      );
    }

    // Validar anexos obrigatórios
    if (!alvara || !crf || !contrato) {
      console.error('Anexos obrigatórios ausentes.');
      return NextResponse.json(
        { error: 'Anexos obrigatórios ausentes.', details: 'Alvará, CRF e contrato social são obrigatórios.' },
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

    // Preparar o objeto JSON para enviar ao backend
    const jsonData: NewClientData = {
      Type: type,
      Email: email,
      Phone: phone,
    };

    // Converter os arquivos para base64
    if (alvara) {
      try {
        const arrayBuffer = await alvara.arrayBuffer();
        jsonData.AlvaraBase64 = Buffer.from(arrayBuffer).toString('base64');
        jsonData.AlvaraFileName = alvara.name;
        jsonData.AlvaraContentType = alvara.type || 'application/octet-stream';
        console.log('Anexo alvara processado:', { fileName: alvara.name, contentType: alvara.type, base64Length: jsonData.AlvaraBase64.length });
      } catch (error) {
        console.error('Erro ao processar o anexo alvara:', error);
        return NextResponse.json(
          { error: 'Erro ao processar o anexo alvara.', details: (error as Error).message },
          { status: 400 }
        );
      }
    }

    if (crf) {
      try {
        const arrayBuffer = await crf.arrayBuffer();
        jsonData.CrfBase64 = Buffer.from(arrayBuffer).toString('base64');
        jsonData.CrfFileName = crf.name;
        jsonData.CrfContentType = crf.type || 'application/octet-stream';
        console.log('Anexo crf processado:', { fileName: crf.name, contentType: crf.type, base64Length: jsonData.CrfBase64.length });
      } catch (error) {
        console.error('Erro ao processar o anexo crf:', error);
        return NextResponse.json(
          { error: 'Erro ao processar o anexo crf.', details: (error as Error).message },
          { status: 400 }
        );
      }
    }

    if (contrato) {
      try {
        const arrayBuffer = await contrato.arrayBuffer();
        jsonData.ContratoBase64 = Buffer.from(arrayBuffer).toString('base64');
        jsonData.ContratoFileName = contrato.name;
        jsonData.ContratoContentType = contrato.type || 'application/octet-stream';
        console.log('Anexo contrato processado:', { fileName: contrato.name, contentType: contrato.type, base64Length: jsonData.ContratoBase64.length });
      } catch (error) {
        console.error('Erro ao processar o anexo contrato:', error);
        return NextResponse.json(
          { error: 'Erro ao processar o anexo contrato.', details: (error as Error).message },
          { status: 400 }
        );
      }
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