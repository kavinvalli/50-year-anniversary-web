import { ErrorBag, Errors, Page, PageProps } from "@inertiajs/inertia";

export interface IUser {
  id: number;
  created_at: string;
  updated_at: string;
  email: string;
  name: string;
  email_verified_at?: string;
  admin: boolean;
  provider: string;
  social_id?: string;
  social_username?: string;
  social_avatar?: string;
}

export interface IEvent {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  venue: string;
  time: string;
  date: string;
}

export interface IAlumni {
  id: number;
  name: string;
  email: string;
  passing_year: number;
  mobile: string;
  gender: "MALE" | "FEMALE";
  created_at: string;
  updated_at: string;
}

export interface IPageProps extends Page<PageProps> {
  props: {
    errors: Errors & ErrorBag;
    authenticated: boolean;
    user: IUser;
  };
}
