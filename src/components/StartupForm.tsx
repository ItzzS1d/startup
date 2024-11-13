"use client";
import React, { useState, useActionState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {z} from "zod"
import "md-editor-v3/lib/style.css";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import {useToast} from "@/hooks/use-toast"

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
const {toast} = useToast()
  const handleSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch: formData.get("pitch") as string,
      };
      await formSchema.parseAsync(formValues);
      console.log(formValues);
      // const result = await createIdea(preState,formData,pitch)
      // console.log(result);
    } catch(error) {
      if(error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors
        setErrors(fieldErrors as unknown as Record<string,string>)
        toast({
          title: "Error",
          description: "Please check your inputs and try again"
        })
        return {...prevState, error:"Validation failed" , status:"error"}

      } 

    } finally {
      
    }
  };
  const [state, formAction, isPending] = useActionState(handleSubmit, {
    error: "",
    status: "initial",
  });
  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          
          placeholder="Startup Title"
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="Description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="Description"
          name="Description"
          className="startup-form_textarea"
          
          placeholder="Startup Description"
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>
      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          
          placeholder="Startup Category (Tech , Health , Education...)"
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>
      <div>
        <label htmlFor="Link" className="startup-form_label">
          Image Link
        </label>
        <Input
          id="Link"
          name="link"
          className="startup-form_input"
          
          placeholder="Image Link"
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>
      <div>
        <label htmlFor="Pitch" className="startup-form_label">
          Pitch
        </label>
        <Textarea
          id="pitch"
          name="pitch"
          className="startup-form_textarea "
          rows={10}
          
          placeholder="Briefly describe your idea and what problem it solves"
        />
        {errors.pitch && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>
      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
