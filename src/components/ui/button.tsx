import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer shadow-sm',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow',
        outline:
          'border border-input bg-background hover:bg-accent/80 hover:text-accent-foreground hover:border-gray-300',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline shadow-none',
        soft: 'bg-blue-50 text-blue-600 hover:bg-blue-100 border-0',
        softRed: 'bg-red-50 text-red-600 hover:bg-red-100 border-0',
        softGreen: 'bg-green-50 text-green-600 hover:bg-green-100 border-0',
        text: 'bg-transparent hover:bg-transparent p-0 shadow-none text-gray-700 hover:text-gray-900 font-normal',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-sm',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        pill: 'h-10 px-6 rounded-full',
        pillSm: 'h-8 px-4 rounded-full text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      loadingText,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? 'span' : 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          isLoading ? 'relative !text-transparent pointer-events-none' : '',
          className
        )}
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {children}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {loadingText && <span className="ml-2 text-current">{loadingText}</span>}
          </div>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
