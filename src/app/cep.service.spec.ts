import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ViaCepService } from './cep.service';

describe('ViaCepService', () => {
  let service: ViaCepService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importe HttpClientTestingModule aqui
      providers: [ViaCepService]
    });
    service = TestBed.inject(ViaCepService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch address by cep', () => {
    const dummyAddress = {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      complemento: 'lado ímpar',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP'
    };

    service.getAddressByCep('01001-000').subscribe(address => {
      expect(address).toEqual(dummyAddress);
    });

    const req = httpMock.expectOne(`${service['viaCepUrl']}/01001-000/json/`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyAddress);
  });
});
