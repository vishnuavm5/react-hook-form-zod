import "./App.css";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
};

function App() {
  const schema: ZodType<FormData> = z
    .object({
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2).max(30),
      email: z.string().email(),
      age: z.number().min(18).max(70),
      password: z.string().min(8).max(16),
      confirmPassword: z.string().min(8).max(16),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password doesnt match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: FormData) => {
    console.log(data);
  };
  return (
    <>
      <div className="App">
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit(submitData)}
        >
          <label htmlFor="First Name">First Name</label>
          <input type="text" {...register("firstName")} />
          {errors.firstName && (
            <span style={{ color: "red" }}>{errors.firstName.message}</span>
          )}
          <label htmlFor="Last Name"> Last Name</label>
          <input type="text" {...register("lastName")} />
          <label htmlFor="email">Email</label>
          <input type="text" {...register("email")} />
          <label htmlFor="Age">Age</label>
          <input type="number" {...register("age", { valueAsNumber: true })} />
          <label htmlFor="Password">Password</label>
          <input type="password" {...register("password")} />
          <label htmlFor="Confirm Password">Confirm Password</label>
          <input type="password" {...register("confirmPassword")} />
          <input type="submit" />
        </form>
      </div>
    </>
  );
}

export default App;
