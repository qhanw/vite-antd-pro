declare namespace API {
    type CurrentUser = {
        name?: string;
        avatar?: string;
        userid?: string;
        email?: string;
        signature?: string;
        title?: string;
        group?: string;
        tags?: { key?: string; label?: string }[];
        notifyCount?: number;
        unreadCount?: number;
        country?: string;
        access?: string;
        geographic?: {
            province?: { label?: string; key?: string };
            city?: { label?: string; key?: string };
        };
        address?: string;
        phone?: string;
    };

    // common query params
    type Qs = { current?: number; pageSize?: number; }

    // response result
    type Res<T> = { data?: T, code?: number, msg?: string }

}