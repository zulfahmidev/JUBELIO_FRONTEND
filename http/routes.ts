const BASE_URL = '';
export const routes = {
    root: {
        upload: () => {
            return `${BASE_URL}/upload`
        },
        graph: ({startDate='', endDate='', enodebId='', cellId=''} : {
            startDate: string, 
            endDate: string,
            enodebId: string,
            cellId: string
        }) => {
            return `${BASE_URL}/?startDate=${startDate}&endDate=${endDate}&enodebId=${enodebId}&cellId=${cellId}`
        },
    },
}
