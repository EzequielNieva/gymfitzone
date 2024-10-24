"use client";
import { FcGoogle } from "react-icons/fc";
import LoginForm from "@/components/LoginForm/LoginForm";
import { signIn } from "next-auth/react";
import { useContext } from 'react';
import { UserContext } from '@/context/user';

const LoginView = () => {
  const { signIn: contextSignIn } = useContext(UserContext);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn('google', {
        callbackUrl: '/api/auth/callback/google',
        redirect: false,
      });

      if (result?.error) {
        console.error('Error en el inicio de sesión con Google:', result.error);
      } else if (result?.url) {
        // Redirige manualmente al usuario a la URL de callback
        window.location.href = result.url;
      }
    } catch (error) {
      console.error('Error inesperado durante el inicio de sesión con Google:', error);
    }
  };
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: "url('https://i.postimg.cc/7YB37My3/carousel.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Capa de fondo oscuro */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Contenedor del formulario */}
      <div className="w-full max-w-md bg-black bg-opacity-50 p-8 rounded shadow-lg relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        <LoginForm />
        <div className="flex items-center justify-center my-4">
          <hr className="flex-grow border-gray-400" />
          <span className="mx-2 text-white">Or access with</span>
          <hr className="flex-grow border-gray-400" />
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="w-full mt-4 bg-gray-600 text-white py-3 rounded hover:bg-gray-700 flex items-center justify-center"
        >
          <FcGoogle className="mr-3 w-6 h-6" />
          <span>Google</span>
        </button>
        <div className="text-center mt-4">
          <p className="text-sm text-white">
            Don't have an account?{" "}
            <a href="/register" className="text-red-600">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
