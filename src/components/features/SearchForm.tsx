import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/context/toast-context";
import { useSearchHistoryStore } from "@/store/search-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const searchSchema = z.object({
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(50, "Location cannot be more than 50 characters"),
});

type SearchFormValues = z.infer<typeof searchSchema>;

export function SearchForm({ defaultValue = "" }) {
  const navigate = useNavigate();
  const toast = useToast();
  const { addToHistory } = useSearchHistoryStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      location: defaultValue,
    },
  });

  const onSubmit = (data: SearchFormValues) => {
    const location = data.location.trim();
    addToHistory(location);

    navigate(`/?q=${encodeURIComponent(location)}`);

    toast.success(`Weather for ${location} loaded`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md gap-2"
    >
      <Input
        {...register("location")}
        placeholder="Search country or city..."
        aria-label="Enter a location"
        className="flex-1"
      />
      <Button type="submit" disabled={isSubmitting}>
        Search
      </Button>

      {errors.location && (
        <p className="text-sm text-destructive mt-1">
          {errors.location.message}
        </p>
      )}
    </form>
  );
}
