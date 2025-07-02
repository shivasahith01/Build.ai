import { useEffect } from 'react';

interface LabelValue {
    label: string;
    value: number;
    total?: number;
    month?: string;
    category?: string;
    type?: string;
}

const useFetchData = (
    fetchFunction: () => Promise<LabelValue[]>,
    setData: React.Dispatch<React.SetStateAction<LabelValue[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    dataType: string
) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await fetchFunction();
                console.log(`${dataType} Data:`, result);

                if (!result || (Array.isArray(result) && result.length === 0)) {
                    console.error(`No valid ${dataType} data returned`);
                }
                setData(result || []);
            } catch (error) {
                console.error(`Error loading ${dataType} data:`, error);
                const errorMsg = error?.message || `Failed to fetch ${dataType} data`;
                setError(errorMsg);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [fetchFunction, setData, setLoading, setError, dataType]);
};

export default useFetchData;
