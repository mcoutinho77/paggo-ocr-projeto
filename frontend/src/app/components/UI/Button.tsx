import React, {
    forwardRef,
    ElementRef,
    ComponentPropsWithoutRef,
    ElementType,
    ReactNode,
  } from 'react';
  import { Slot } from '@radix-ui/react-slot';
  import { twMerge } from 'tailwind-merge';
  
  type Variant = 'default' | 'outline' | 'ghost' | 'link';
  type Size = 'default' | 'small' | 'icon';
  
  interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    variant?: Variant;
    size?: Size;
    className?: string;
    children?: ReactNode;
    asChild?: boolean;
  }
  
  const Button = forwardRef<ElementRef<'button'>, ButtonProps>(
    (
      {
        variant = 'default',
        size = 'default',
        className,
        children,
        asChild = false,
        type = 'button',
        disabled,
        ...props
      },
      ref
    ) => {
      const Comp: ElementType = asChild ? Slot : 'button';
  
      return (
        <Comp
          className={twMerge(
            'inline-flex items-center justify-center rounded-md font-medium transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            disabled && 'opacity-50 cursor-not-allowed',
            variant === 'default' && 'bg-blue-500 text-white hover:bg-blue-600',
            variant === 'outline' && 'border border-gray-300 text-gray-900 hover:bg-gray-100',
            variant === 'ghost' && 'text-gray-900 hover:bg-gray-100',
            variant === 'link' && 'text-blue-500 hover:underline',
            size === 'default' && 'px-4 py-2',
            size === 'small' && 'px-3 py-1.5 text-sm',
            size === 'icon' && 'p-2 rounded-full',
            className
          )}
          ref={ref}
          type={asChild ? undefined : type}
          disabled={asChild ? undefined : disabled}
          {...props}
        >
          {children}
        </Comp>
      );
    }
  );
  
  Button.displayName = 'Button';
  
  export default Button;