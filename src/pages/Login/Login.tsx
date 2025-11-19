import styles from "./login.module.css";
import { useForm, type SubmitHandler } from "react-hook-form";

const Roles = ["Auditor","Administrador"] as const;
type Role = typeof Roles[number];

type Inputs = {
  email: string;
  nombre?: string;
  nombreUsuario?: string;
  password?: string;
  rol?: Role;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { email: "" },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("submit:", data);
  };

  return (
    <form className={`${styles.formulario} ` } onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="email">Correo electrónico :</label>
      <input
        id="email"
        type="email"
        placeholder="tu@correo.com"
        {...register("email", {
          required: "debe reyenar todos los campos",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Formato de email inválido",
          },
        })}
      />
      {errors.email && <p role="alert">{errors.email.message}</p>}
       <label htmlFor="nombre">Nombre :</label>
      <input
        id="nombre"
        type="text"
        placeholder="Tu nombre"
        {...register("nombre", {
          required: "debe reyenar todos los campos",
        })}
      />
      {errors.nombre && <p role="alert">{errors.nombre.message}</p>}
      <label htmlFor="nombreUsuario">Nombre de Usuario :</label>
      <input
        id="nombreUsuario"
        type="text"
        placeholder="Tu nombre de Usuario"
        {...register("nombreUsuario", {
          required: "debe reyenar todos los campos",
        })}
      />
      {errors.nombreUsuario && <p role="alert">{errors.nombreUsuario.message}</p>}
      <label htmlFor="password">Password :</label>
      <input
        id="password"
        type="password"
        placeholder="Tu Password"
        {...register("password", {
          required: "debe reyenar todos los campos",
        })}
      />
      {errors.password && <p role="alert">{errors.password.message}</p>}
      <label htmlFor="rol">Rol</label>
      <select
        id="rol"
        {...register("rol", {
          required: "Elige un rol",
        })}
      >
        <option value="">Selecciona un rol :</option>
        {Roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      {errors.rol && <p role="alert">{errors.rol.message}</p>}

      <button type="submit">Entrar</button>
      
    </form>
  );
}