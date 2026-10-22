# Local-only script for a manual Edge Function call.
# Requires a valid Supabase access token for a full account and an applied migration.
# Run only in a non-production environment unless the team has explicitly approved it.

$ErrorActionPreference = 'Stop'

$FunctionUrl = $env:INTERVIEW_COACH_URL
$SupabaseAnonKey = $env:SUPABASE_ANON_KEY

if (-not $FunctionUrl) {
  throw 'Set INTERVIEW_COACH_URL before running this script.'
}

if (-not $SupabaseAnonKey) {
  throw 'Set SUPABASE_ANON_KEY before running this script.'
}

$Body = @{
  question = 'Describe a time you solved a problem at work.'
  answer = 'I noticed a bottleneck in the process, so I mapped the steps, removed a redundant approval, and the team completed the work faster.'
  category = 'behavioral'
} | ConvertTo-Json -Compress

$Headers = @{
  'Content-Type' = 'application/json'
  'Authorization' = "Bearer $SupabaseAnonKey"
}

try {
  $Response = Invoke-RestMethod -Method Post -Uri $FunctionUrl -Headers $Headers -Body $Body
  $Response | ConvertTo-Json -Depth 20
}
catch {
  Write-Error $_.Exception.Message
  throw
}
