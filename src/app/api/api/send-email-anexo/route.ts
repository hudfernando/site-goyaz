import { api } from '@/http/api';
import { HTTPError } from 'ky';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const type = formData.get('type') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const resume = formData.get('resume') as File | null;

    // Validar os campos obrigatórios
    if (!type || !name || !email) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes.', details: 'Type, name e email são obrigatórios.' },
        { status: 400 }
      );
    }

    // Preparar o objeto JSON para enviar ao backend
    const jsonData: any = {
      type,
      name,
      email,
    };

    // Converter o arquivo para base64, se presente
    if (resume) {
      const arrayBuffer = await resume.arrayBuffer();
      const base64String = Buffer.from(arrayBuffer).toString('base64');
      jsonData.resumeBase64 = base64String;
      jsonData.resumeFileName = resume.name;
      jsonData.resumeContentType = resume.type || 'application/octet-stream';
    }

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