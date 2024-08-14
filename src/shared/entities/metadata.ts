export interface IMetadataResponse {
    page: number;
    total_pages: number;
    items_per_page: number;
    total_records: number;
    total_current_records: number;
    has_next_page: boolean;
    has_previous_page: boolean;
}