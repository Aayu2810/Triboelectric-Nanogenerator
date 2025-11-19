export default function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(' ');
}