resource "google_cloud_run_service" "default" {
  name     = "nestjs-app-test"
  location = var.gcp_region

  template {
    spec {
      containers {
        env {
          name  = "MONGO_URI"
          value = var.mongo_uri
        }

        image = var.container_image
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}
