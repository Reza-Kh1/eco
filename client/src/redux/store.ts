import { configureStore } from '@reduxjs/toolkit';
import formRegister from './slice/formRegister';
import user from './slice/user';

export default configureStore({
    reducer: {
        user,
        form: formRegister
    }
});