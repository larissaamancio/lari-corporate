import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FilialService } from './filial.service';

describe('FilialService', () => {
  let service: FilialService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule], // Importe HttpClientModule aqui
      providers: [FilialService]
    });
    service = TestBed.inject(FilialService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch filiais from API via GET', () => {
    const mockFiliais = [
      { id: 1, nome: 'Filial A' },
      { id: 2, nome: 'Filial B' }
    ];

    service.getFiliais().subscribe(filiais => {
      expect(filiais).toEqual(mockFiliais);
    });

    const req = httpMock.expectOne(`${service['filiaisUrl']}filial`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFiliais);
  });

  it('should create a new filial via POST', () => {
    const newFilial = { id: 1, nome: 'Nova Filial', endereco: 'Rua A, 123' };

    service.create(newFilial).subscribe(response => {
      expect(response).toEqual(newFilial);
    });

    const req = httpMock.expectOne(`${service['filiaisUrl']}filial`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newFilial);
    req.flush(newFilial);
  });
});
