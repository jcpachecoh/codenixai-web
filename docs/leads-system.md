# 📊 Sistema de Leads - CodeNix AI

Sistema completo de gestión de leads implementado con **Supabase** y **Next.js**, siguiendo las mejores prácticas de la documentación oficial.

## 🚀 Características

### ✅ CRUD Completo

- **Crear** leads desde formularios de contacto
- **Leer** leads con paginación y filtros
- **Actualizar** estado y datos de leads
- **Eliminar** leads (con confirmación)

### 🎯 Funcionalidades Avanzadas

- **Tracking UTM** completo (source, medium, campaign, content, term)
- **Gestión de estados** (new, contacted, qualified, proposal, closed, lost)
- **Seguimiento de fuentes** (contact_form, whatsapp_automation_form, etc.)
- **Metadata técnica** (IP, User Agent, Referrer)
- **Estadísticas** en tiempo real
- **Operaciones en lote**
- **Row Level Security (RLS)**

## 🏗️ Arquitectura

```
src/
├── types/leads.ts          # Interfaces TypeScript
├── services/leadService.ts # Lógica de negocio
├── lib/supabase.ts        # Configuración Supabase
└── app/api/leads/route.ts # API endpoints

database/
└── leads-schema.sql       # Schema completo de BD
```

## 🔧 Configuración

### 1. Variables de Entorno

Crea/actualiza `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

### 2. Base de Datos

Ejecuta el script SQL en Supabase Dashboard > SQL Editor:

```sql
-- Ver: database/leads-schema.sql
```

### 3. Verificar Configuración

```bash
npm run setup:supabase
```

## 📡 API Endpoints

### POST /api/leads

Crear nuevo lead:

```javascript
const response = await fetch("/api/leads", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Juan Pérez",
    email: "juan@example.com",
    message: "Interesado en WhatsApp automation",
    phone: "+52 555 123 4567",
    company: "Tech Corp",
    source: "whatsapp_automation_form",
    utm_source: "google",
    utm_medium: "cpc",
  }),
});
```

### GET /api/leads

Obtener leads con paginación:

```javascript
const response = await fetch("/api/leads?limit=10&offset=0");
const { data, total, page, totalPages } = await response.json();
```

## 🛠️ Uso del Servicio

### Crear Lead

```typescript
import { LeadService } from "@/services/leadService";

const { success, data, error } = await LeadService.createLead({
  name: "María García",
  email: "maria@example.com",
  message: "Consulta sobre desarrollo",
  source: "contact_form",
});
```

### Obtener Leads con Filtros

```typescript
const { success, data } = await LeadService.getLeads({
  limit: 20,
  offset: 0,
  orderBy: "created_at",
  orderDirection: "desc",
  filters: {
    status: ["new", "contacted"],
    source: ["whatsapp_automation_form"],
    dateFrom: "2024-01-01",
    search: "automation",
  },
});
```

### Actualizar Estado

```typescript
await LeadService.updateLeadStatus(
  leadId,
  "contacted",
  "Llamé al cliente, muy interesado"
);
```

### Estadísticas

```typescript
const { data: stats } = await LeadService.getLeadStats();
console.log(`Conversión: ${stats.conversionRate}%`);
```

## 📊 Tipos de Datos

### LeadStatus

```typescript
type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal"
  | "closed"
  | "lost";
```

### LeadSource

```typescript
type LeadSource =
  | "contact_form"
  | "whatsapp_automation_form"
  | "career_application"
  | "newsletter"
  | "referral"
  | "social_media"
  | "google_ads"
  | "organic_search"
  | "direct"
  | "other";
```

## 🔒 Seguridad

### Row Level Security (RLS)

- **Público**: Puede insertar leads (formularios)
- **Autenticado**: Puede ver y editar leads
- **Service Role**: Acceso completo

### Validación

- **Zod schemas** para validación de entrada
- **TypeScript** para seguridad de tipos
- **Sanitización** automática de datos

## 📈 Monitoreo

### Logs

Todos los servicios incluyen logging detallado:

```javascript
console.log("Creating lead with data:", leadData);
console.log("Lead created successfully:", data);
```

### Vista de Estadísticas

```sql
SELECT * FROM lead_stats;
-- Retorna: total, por estado, revenue, conversión
```

## 🎛️ Comandos Útiles

```bash
# Verificar configuración
npm run setup:supabase

# Desarrollo
npm run dev

# Logs en tiempo real
tail -f .next/trace
```

## 🐛 Troubleshooting

### Error: "fetch failed"

1. ✅ Verificar variables de entorno
2. ✅ Confirmar que Supabase esté configurado
3. ✅ Aplicar schema de base de datos

### Error: "Base de datos no configurada"

```bash
# Verificar configuración
npm run check:env
```

### Error de permisos

1. Verificar RLS policies en Supabase
2. Confirmar service role key

## 🚀 Próximos Pasos

- [ ] Implementar autenticación de admin
- [ ] Dashboard de analytics
- [ ] Email automation
- [ ] Export to CSV
- [ ] Slack integration mejorada
- [ ] Lead scoring automático

## 🤝 Integración con Formularios

El sistema está integrado con:

- ✅ Formulario de contacto principal
- ✅ Formulario de WhatsApp automation
- ⏳ Formulario de carreras (próximamente)

Cada formulario usa `source` específico para tracking.
