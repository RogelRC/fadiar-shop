import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar que los campos requeridos estén presentes
    if (!body.email || !body.name || !body.auth_provider) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }
    
    // Aquí normalmente enviarías estos datos a tu backend
    // Por ahora, simularemos una respuesta exitosa
    
    // Simular verificación de si el usuario ya existe
    const userExists = Math.random() > 0.5;
    
    if (userExists) {
      // Usuario ya registrado y verificado
      return NextResponse.json(
        { 
          success: true,
          message: 'Inicio de sesión exitoso',
          needsVerification: false
        },
        { status: 200 }
      );
    } else {
      // Usuario nuevo, requiere verificación
      return NextResponse.json(
        { 
          success: true,
          message: 'Usuario registrado, se requiere verificación',
          needsVerification: true
        },
        { status: 201 }
      );
    }
    
  } catch (error) {
    console.error('Error en la autenticación social:', error);
    return NextResponse.json(
      { error: 'Error en el servidor' },
      { status: 500 }
    );
  }
}