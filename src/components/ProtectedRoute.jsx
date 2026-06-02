import { Show } from "solid-js";
import { Navigate } from "@solidjs/router";
import { isLoggedIn } from "../stores/auth";

export default function ProtectedRoute(props) {
  return (
    <Show when={isLoggedIn()} fallback={<Navigate href="/login" />}>
      {props.children}
    </Show>
  );
}
