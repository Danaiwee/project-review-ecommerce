import { Loader2 } from "lucide-react";

const LoadingState = () => {
  return (
    <div className='min-w-screen min-h-screen mx-auto flex items-center justify-center'>
      <Loader2 className='size-18 animate-spin' />
    </div>
  );
};

export default LoadingState;
