resource "google_storage_bucket" "app_bucket" {
  name          = "my-nestjs-app-bucket"
  location      = var.gcp_region
  force_destroy = true
  uniform_bucket_level_access = true
}
