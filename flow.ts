import { collections, interfaces, registers } from 'flow/modules';

// Implementation for derivation flow.yaml#/collections/temperature~1average-by-location/derivation.
export class TemperatureAverageByLocation implements interfaces.TemperatureAverageByLocation {
    readingsUpdate(
        source: collections.TemperatureReadings,
    ): registers.TemperatureAverageByLocation[] {
        return [{
            numReadings: 1,
            totalC: source.tempC,
            lastReading: source.timestamp,
            minTempC: source.tempC,
            maxTempC: source.tempC
        }]
    }
    readingsPublish(
        source: collections.TemperatureReadings,
        register: registers.TemperatureAverageByLocation,
        previous: registers.TemperatureAverageByLocation,
    ): collections.TemperatureAverageByLocation[] {
        return [publishAvgTemp(source.sensorId, register)]
    }
    sensorsUpdate(
        source: collections.TemperatureSensors,
    ): registers.TemperatureAverageByLocation[] {
        return [{ locationName: source.locationName }]
    }
    sensorsPublish(
        source: collections.TemperatureSensors,
        register: registers.TemperatureAverageByLocation,
        previous: registers.TemperatureAverageByLocation,
    ): collections.TemperatureAverageByLocation[] {
        if (register.locationName === previous.locationName || !register.lastReading) {
            return []
        } else {
            return [publishAvgTemp(source.id, register)]
        }
    }
}

function publishAvgTemp(sensorId: number, register: registers.TemperatureAverageByLocation):
    collections.TemperatureAverageByLocation {
        var avg = Math.round(register.totalC! / register.numReadings! * 100) / 100.0
        return {
            sensorId: sensorId,
            locationName: register.locationName!,
            averageTempC: avg,
            minTempC: register.minTempC!,
            maxTempC: register.maxTempC!,
            lastReading: register.lastReading!,
        }
    }