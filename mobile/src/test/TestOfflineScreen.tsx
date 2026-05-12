import React from 'react';
import { View, Button } from 'react-native';
import { CreateLotUseCase } from '../features/lots/application/use-cases/create-lot.use-case';
import { GetLotsUseCase } from '../features/lots/application/use-cases/get-lots.use-case';
import { syncLots } from '../features/lots/infrastructure/sync/lots.sync';

export default function TestOfflineScreen() {

    async function createLot() {

        const useCase = new CreateLotUseCase();

        await useCase.execute(
            {
                nombre: 'Lote Offline',
                hectareas: 10,
                temperatura_min: 20,
                temperatura_max: 30,
                fecha_inicio: new Date().toISOString(),
                numero_plantas: 100
            },
            'user-test'
        );

        console.log('✅ Lote creado offline');

    }

    async function getLots() {

        const useCase = new GetLotsUseCase();

        const lots = await useCase.execute('user-test');

        console.log('📦 LOTES:', lots);

    }

    async function sync() {

        await syncLots();

        console.log('🔄 Sync ejecutado');

    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                gap: 20,
                padding: 20
            }}
        >

            <Button
                title="Crear lote offline"
                onPress={createLot}
            />

            <Button
                title="Ver lotes locales"
                onPress={getLots}
            />

            <Button
                title="Sincronizar"
                onPress={sync}
            />

        </View>
    );
}