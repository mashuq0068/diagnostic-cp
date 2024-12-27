import {create} from "zustand";


const useLoadingStore = create((set) => ({
    loading:false,
    setLoading:(status)=>{
        set({loading:status});
        status ?
            document.getElementsByTagName("html")[0].classList.add('overflow-hidden'):
            document.getElementsByTagName("html")[0].classList.remove('overflow-hidden');
    }
}))

export default useLoadingStore;