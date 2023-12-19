output "cloud_run_service_url" {
  value = google_cloud_run_service.default.status[0].url
}

output "storage_bucket_name" {
  value = google_storage_bucket.app_bucket.name
}
