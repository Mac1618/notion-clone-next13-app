import { create } from 'zustand';

// type props
type SettingStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

// useSettings hook
export const useSettings = create<SettingStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
