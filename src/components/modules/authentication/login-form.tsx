"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import {useForm} from "@tanstack/react-form"
import Link from "next/link"
import { toast } from "sonner"
import z, { email } from "zod"

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const formSchema = z.object({
    email: z.string().min(5, "minimum 5 character required"),
    password: z.string().min(8, "minimum 8 character required")
  })
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({value}) =>  {
      const toastId = toast.loading("creating User")
     try {
      
      const {  data, error } = await authClient.signIn.email(value);
      if(error){
        toast.error(error.message, {id: toastId})
        return;
      }
      toast.success("User created successfully")
     } catch (error) {
      toast.error("something happen wrong ", {id: toastId})
     }
    }
  })
  const handleSocialLogin = async() => {
     const data = await authClient.signIn.social({
    provider: "google",
    callbackURL: "http://localhost:3000"
  });
  console.log(data, "hellop");
  }
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your email below to login your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="register-form" onSubmit={(e) => {e.preventDefault() 
          form.handleSubmit(e)}

        }>
          <FieldGroup>
            <form.Field name="email" children={(field) => {
              const isInvalid = field.state.meta.isTouched && ! field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input id={field.name}  name={field.name} onChange={(e) => field.handleChange(e.target.value)} aria-invalid={isInvalid} placeholder="Your Email"autoComplete="off"/>
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors}/>
                  )}

                </Field>
              )
            }}></form.Field>
            <form.Field name="password" children={(field) => {
              const isInvalid = field.state.meta.isTouched && ! field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input id={field.name} type="password" name={field.name} onChange={(e) => field.handleChange(e.target.value)} aria-invalid={isInvalid} placeholder="Your Name"autoComplete="off"/>
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors}/>
                  )}

                </Field>
              )
            }}></form.Field>
          </FieldGroup>
          
         
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5">
        <Button form="register-form" type="submit" className="w-full">Submit</Button>
         <Button className="w-full" onClick={() => handleSocialLogin()} variant="outline" type="button">
                  Login with Google
                </Button>
                 <FieldDescription className="text-center">
             Not have an  account? <Link href="#">Signup</Link>
                </FieldDescription>
      </CardFooter>
    </Card>
  )
}
