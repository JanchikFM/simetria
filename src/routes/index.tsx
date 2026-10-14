import { createFileRoute } from "@tanstack/react-router";
import { DriveApp } from "@/components/drive-app";

export const Route = createFileRoute("/")({ component: DriveApp });
