import { api } from '@/http/api';
import { HTTPError } from 'ky';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const { type, name, phone, email, suggestion} = data

    // Enviar os dados para a API backend usando Ky
    const response = await api
      .post('Email/Sugestion', {
        json: {
          type,
          name,
          phone,
          email,
          suggestion,
        },
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