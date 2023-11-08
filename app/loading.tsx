import { tw } from './_common/utils/classname.util';
import LucideIcon from './_server/atoms/lucide-icon.atom';

export default function Loading() {
  return (
    <div className={tw`flex h-screen w-screen items-center justify-center`}>
      <LucideIcon className={tw`h-10 w-10 animate-spin`} name="loader-2" />
    </div>
  );
}
