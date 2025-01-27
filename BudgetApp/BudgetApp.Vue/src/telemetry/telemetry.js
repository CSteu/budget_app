// telemetry.js
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { trace, SpanStatusCode, diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

// **Optional: Enable OpenTelemetry Diagnostic Logging**
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

// Configure the OTLP trace exporter
const exporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces',
});

// Initialize the tracer provider with resource attributes and span processors
const provider = new WebTracerProvider({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: 'budget-app-frontend',
  }),
  spanProcessors: [
    new BatchSpanProcessor(exporter),
  ],
});

// Register the tracer provider globally
provider.register();

// Register desired instrumentations
registerInstrumentations({
  instrumentations: [
    new FetchInstrumentation(),
    new DocumentLoadInstrumentation(),
    new UserInteractionInstrumentation(),
  ],
});

function getTracer() {
  return trace.getTracer('budget-app-frontend-tracer');
}

export function instrumentMyComponentMethod(method) {
  return async function (...args) {
    const tracer = getTracer();
    const span = tracer.startSpan(`MyComponent.${method.name}`);

    try {
      const result = method(...args);

      if (result instanceof Promise) {
        const resolvedResult = await result
          .then(res => {
            span.setStatus({ code: SpanStatusCode.OK });
            return res;
          })
          .catch(error => {
            span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
            span.recordException(error);
            throw error;
          });

        return resolvedResult;
      } else {
        span.setStatus({ code: SpanStatusCode.OK });
        return result;
      }
    } catch (error) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
      span.recordException(error);
      throw error;
    } finally {
      span.end();
    }
  };
}