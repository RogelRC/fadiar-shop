import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Aquí puedes manejar la lógica después del inicio de sesión
      // Por ejemplo, enviar los datos del usuario a tu API
      if (user && account) {
        try {
          // Extraer nombre y apellidos
          const fullName = user.name || '';
          const nameParts = fullName.split(' ').filter(part => part.length > 0);
          
          let name = '';
          let last1 = '';
          let last2 = '';
          
          if (nameParts.length >= 1) {
            name = nameParts[0];
          }
          if (nameParts.length >= 2) {
            last1 = nameParts[1];
          }
          if (nameParts.length >= 3) {
            last2 = nameParts[2];
          }
          
          const dataToSend = {
            email: user.email,
            name: name,
            lastname1: last1,
            lastname2: last2,
            password: "", // No se requiere contraseña para autenticación social
            type: "Cliente",
            auth_provider: account.provider
          };

          // Enviar datos a tu API
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/social_auth`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dataToSend),
            },
          );

          if (!response.ok) {
            console.error('Error al registrar usuario con proveedor social');
            return false;
          }

          return true;
        } catch (error) {
          console.error('Error en el proceso de autenticación social:', error);
          return false;
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Personaliza la redirección después del inicio de sesión
      return baseUrl;
    },
    async session({ session, user, token }) {
      // Puedes añadir datos adicionales a la sesión aquí
      return session;
    },
    async jwt({ token, user, account, profile }) {
      // Puedes modificar el token JWT aquí
      return token;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };