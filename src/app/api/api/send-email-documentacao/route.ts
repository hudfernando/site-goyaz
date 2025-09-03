import { api } from '@/http/api';
import { HTTPError } from 'ky';
import { NextRequest, NextResponse } from "next/server";

interface DocumentationData {
  Type: string;
  Name: string;
  Email: string;
  Phone: string;
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
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const document1 = formData.get('document1') as File | null;
    const document2 = formData.get('document2') as File | null;
    const document3 = formData.get('document3') as File | null;

    // Validar os campos obrigatórios
    if (!type || type !== 'documentation') {
      console.error('Tipo inválido ou ausente:', type);
      return NextResponse.json(
        { error: 'Tipo inválido.', details: 'O tipo deve ser "documentation".' },
        { status: 400 }
      );
    }

    if (!name || !email || !phone) {
      console.error('Campos obrigatórios ausentes:', { name, email, phone });
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes.', details: 'Name, email e phone são obrigatórios.' },
        { status: 400 }
      );
    }

    // Validar pelo menos um documento
    if (!document1 && !document2 && !document3) {
      console.error('Pelo menos um documento é obrigatório.');
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

    // Preparar o objeto JSON para enviar ao backend
    const jsonData: DocumentationData = {
      Type: type,
      Name: name,
      Email: email,
      Phone: phone,
    };

    // Converter os arquivos para base64, se presentes
    if (document1) {
      try {
        const arrayBuffer = await document1.arrayBuffer();
        jsonData.Document1Base64 = Buffer.from(arrayBuffer).toString('base64');
        jsonData.Document1FileName = document1.name;
        jsonData.Document1ContentType = document1.type || 'application/octet-stream';
        console.log('Anexo document1 processado:', { fileName: document1.name, contentType: document1.type, base64Length: jsonData.Document1Base64.length });
      } catch (error) {
        console.error('Erro ao processar o anexo document1:', error);
        return NextResponse.json(
          { error: 'Erro ao processar o anexo document1.', details: (error as Error).message },
          { status: 400 }
        );
      }
    }

    if (document2) {
      try {
        const arrayBuffer = await document2.arrayBuffer();
        jsonData.Document2Base64 = Buffer.from(arrayBuffer).toString('base64');
        jsonData.Document2FileName = document2.name;
        jsonData.Document2ContentType = document2.type || 'application/octet-stream';
        console.log('Anexo document2 processado:', { fileName: document2.name, contentType: document2.type, base64Length: jsonData.Document2Base64.length });
      } catch (error) {
        console.error('Erro ao processar o anexo document2:', error);
        return NextResponse.json(
          { error: 'Erro ao processar o anexo document2.', details: (error as Error).message },
          { status: 400 }
        );
      }
    }

    if (document3) {
      try {
        const arrayBuffer = await document3.arrayBuffer();
        jsonData.Document3Base64 = Buffer.from(arrayBuffer).toString('base64');
        jsonData.Document3FileName = document3.name;
        jsonData.Document3ContentType = document3.type || 'application/octet-stream';
        console.log('Anexo document3 processado:', { fileName: document3.name, contentType: document3.type, base64Length: jsonData.Document3Base64.length });
      } catch (error) {
        console.error('Erro ao processar o anexo document3:', error);
        return NextResponse.json(
          { error: 'Erro ao processar o anexo document3.', details: (error as Error).message },
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