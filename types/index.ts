interface FileObject {
    name: string;
    id: string;
    owner: string;
    updated_at: string;
    created_at: string;
    last_accessed_at: string;
    metadata: Record<string, unknown>;
};

export type restoredImage = FileObject;