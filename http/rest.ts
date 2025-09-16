export interface APIResponse {
    status: number
    message: string;
    body: any;
}

export interface PaginationData {
    total_items: number;
    items_per_page: number;
    total_pages: number;
    current_page: number;
}

export interface PaginatedResponse<T> {
    items: T[];
    pagination: PaginationData
}
