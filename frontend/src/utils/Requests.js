export class Requests {
    constructor(setError, setIsLoading) {
        this.setError = setError;
        this.setIsLoading = setIsLoading;
    }

    async get(route) {
        this.setError('');
        this.setIsLoading(true);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/${route}`,
                {
                    credentials: 'include',
                },
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            return data;
        } catch (err) {
            this.setError(err.message);
        } finally {
            this.setIsLoading(false);
        }
    }
}
