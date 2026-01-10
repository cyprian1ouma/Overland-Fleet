<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bootstrap Features Demo</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    .animate-fadeIn {
      animation: fadeIn 1s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  </style>
</head>
<body>

<div class="container py-5">
  <!-- Dark Mode Toggle -->
  <div class="mb-4">
    <label for="darkModeToggle" class="form-label">Enable Dark Mode</label>
    <input type="checkbox" id="darkModeToggle" class="form-check-input">
  </div>

  <!-- Animated Card -->
  <div class="card animate-fadeIn mb-4" style="width: 18rem;">
    <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Animated Card</h5>
      <p class="card-text">This card fades in with an animation effect.</p>
    </div>
  </div>

  <!-- Tooltip Example -->
  <button class="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Click me for info!">
    Hover over me
  </button>
</div>

<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>
<script>
  // Tooltip initialization
  var tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Dark mode toggle script
  document.getElementById('darkModeToggle').addEventListener('change', function(e) {
    if (e.target.checked) {
      document.body.classList.add('bg-dark', 'text-light');
    } else {
      document.body.classList.remove('bg-dark', 'text-light');
    }
  });
</script>
</body>
</html>
