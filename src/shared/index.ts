// Config exports
export { PrivateRoutes, PrivatePaths } from '@/shared/config';
export { PublicRoutes, PublicPaths } from '@/shared/config';

// Constants exports
export { Colors, Color, type Colors as ColorType, CurrencyCrypto, CurrencyMoney, CurrencyStocks } from '@/shared/constants';

// Lib exports
export { fontSans, supabaseClient, cn, formatCurrency, formatPriceDifference } from '@/shared/lib';

// Providers exports
export { QueryProvider, ThemeProvider } from '@/shared/providers';

// UI exports
export {
	Button,
	Input,
	Card,
	Field,
	FieldLabel,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLegend,
	FieldSeparator,
	FieldSet,
	FieldContent,
	FieldTitle,
	Form,
	Label,
	Separator,
	Toaster,
	Switch,
	TitleBar,
	Spinner,
	FormWrapper,
	Badge,
	ModalWrapper,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Skeleton,
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	TableFooter,
	FormField,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
	FormSelect,
	ScrollArea,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Calendar,
	DatePicker,
} from '@/shared/ui';

export type { Error } from '@/shared/types';
