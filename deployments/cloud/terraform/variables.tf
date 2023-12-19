variable "gcp_project" {
  description = "The GCP project id"
}

variable "gcp_region" {
  description = "The GCP region"
  default     = "us-central1"
}

variable "container_image" {
  description = "Container image for Cloud Run"
}

variable "mongo_uri" {
  description = "MongoDB URI for the application"
  type        = string
}
