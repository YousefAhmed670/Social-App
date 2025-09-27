export interface createPostDto {
    content: string;
    attachment?: any[];
}
    
export interface updatePostDto {
    content?: string;
    attachments?: any[];
}