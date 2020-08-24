import { __decorate, __metadata } from "tslib";
import { Component, ElementRef, HostBinding, Input, OnInit, Renderer2, ViewEncapsulation, ChangeDetectionStrategy, } from '@angular/core';
var MDBBadgeComponent = /** @class */ (function () {
    function MDBBadgeComponent(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
    }
    MDBBadgeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._renderer.addClass(this._el.nativeElement, 'badge');
        if (this.color) {
            var customClassArr = this.color.split(' ');
            customClassArr.forEach(function (el) {
                _this._renderer.addClass(_this._el.nativeElement, el);
            });
        }
    };
    MDBBadgeComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input(), HostBinding('class.badge-default'),
        __metadata("design:type", Boolean)
    ], MDBBadgeComponent.prototype, "default", void 0);
    __decorate([
        Input(), HostBinding('class.badge-primary'),
        __metadata("design:type", Boolean)
    ], MDBBadgeComponent.prototype, "primary", void 0);
    __decorate([
        Input(), HostBinding('class.badge-success'),
        __metadata("design:type", Boolean)
    ], MDBBadgeComponent.prototype, "success", void 0);
    __decorate([
        Input(), HostBinding('class.badge-info'),
        __metadata("design:type", Boolean)
    ], MDBBadgeComponent.prototype, "info", void 0);
    __decorate([
        Input(), HostBinding('class.badge-warning'),
        __metadata("design:type", Boolean)
    ], MDBBadgeComponent.prototype, "warning", void 0);
    __decorate([
        Input(), HostBinding('class.badge-danger'),
        __metadata("design:type", Boolean)
    ], MDBBadgeComponent.prototype, "danger", void 0);
    __decorate([
        Input(), HostBinding('class.badge-pill'),
        __metadata("design:type", Boolean)
    ], MDBBadgeComponent.prototype, "pill", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MDBBadgeComponent.prototype, "classInside", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MDBBadgeComponent.prototype, "color", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MDBBadgeComponent.prototype, "class", void 0);
    MDBBadgeComponent = __decorate([
        Component({
            selector: 'mdb-badge',
            template: "<span class=\"{{class}} {{classInside}}\">\n  <ng-content></ng-content>\n</span>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [".badge{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);border-radius:.125rem;color:#fff!important}.badge-pill{border-radius:10rem;padding-right:.6rem;padding-left:.6rem}.badge-primary{background-color:#4285f4!important;color:#fff!important}.badge-danger{background-color:#ff3547!important;color:#fff!important}.badge-warning{background-color:#fb3!important;color:#fff!important}.badge-success{background-color:#00c851!important;color:#fff!important}.badge-info{background-color:#33b5e5!important;color:#fff!important}.badge-default{background-color:#2bbbad!important;color:#fff!important}.badge-secondary{background-color:#a6c!important;color:#fff!important}.badge-dark{background-color:#212121!important;color:#fff!important}.badge-light{background-color:#e0e0e0!important;color:#000!important}"]
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer2])
    ], MDBBadgeComponent);
    return MDBBadgeComponent;
}());
export { MDBBadgeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWRiLWJhZGdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItYm9vdHN0cmFwLW1kLyIsInNvdXJjZXMiOlsibGliL2ZyZWUvYmFkZ2UvbWRiLWJhZGdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNqQix1QkFBdUIsR0FDeEIsTUFBTSxlQUFlLENBQUM7QUFTdkI7SUFjRSwyQkFBb0IsR0FBZSxFQUFVLFNBQW9CO1FBQTdDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO0lBQUcsQ0FBQztJQUVyRSxvQ0FBUSxHQUFSO1FBQUEsaUJBU0M7UUFSQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6RCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUU3QyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUMsRUFBVTtnQkFDaEMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7O2dCQVh3QixVQUFVO2dCQUFxQixTQUFTOztJQWJwQjtRQUE1QyxLQUFLLEVBQUUsRUFBRSxXQUFXLENBQUMscUJBQXFCLENBQUM7O3NEQUFrQjtJQUNqQjtRQUE1QyxLQUFLLEVBQUUsRUFBRSxXQUFXLENBQUMscUJBQXFCLENBQUM7O3NEQUFrQjtJQUNqQjtRQUE1QyxLQUFLLEVBQUUsRUFBRSxXQUFXLENBQUMscUJBQXFCLENBQUM7O3NEQUFrQjtJQUNwQjtRQUF6QyxLQUFLLEVBQUUsRUFBRSxXQUFXLENBQUMsa0JBQWtCLENBQUM7O21EQUFlO0lBQ1g7UUFBNUMsS0FBSyxFQUFFLEVBQUUsV0FBVyxDQUFDLHFCQUFxQixDQUFDOztzREFBa0I7SUFDbEI7UUFBM0MsS0FBSyxFQUFFLEVBQUUsV0FBVyxDQUFDLG9CQUFvQixDQUFDOztxREFBaUI7SUFDbEI7UUFBekMsS0FBSyxFQUFFLEVBQUUsV0FBVyxDQUFDLGtCQUFrQixDQUFDOzttREFBZTtJQUUvQztRQUFSLEtBQUssRUFBRTs7MERBQXFCO0lBRXBCO1FBQVIsS0FBSyxFQUFFOztvREFBZTtJQUNkO1FBQVIsS0FBSyxFQUFFOztvREFBZTtJQVpaLGlCQUFpQjtRQVA3QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsV0FBVztZQUNyQiw4RkFBeUM7WUFFekMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2hELENBQUM7eUNBZXlCLFVBQVUsRUFBcUIsU0FBUztPQWR0RCxpQkFBaUIsQ0EwQjdCO0lBQUQsd0JBQUM7Q0FBQSxBQTFCRCxJQTBCQztTQTFCWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1iYWRnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9tZGItYmFkZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9iYWRnZS1tb2R1bGUuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTURCQmFkZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2NsYXNzLmJhZGdlLWRlZmF1bHQnKSBkZWZhdWx0OiBib29sZWFuO1xuICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2NsYXNzLmJhZGdlLXByaW1hcnknKSBwcmltYXJ5OiBib29sZWFuO1xuICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2NsYXNzLmJhZGdlLXN1Y2Nlc3MnKSBzdWNjZXNzOiBib29sZWFuO1xuICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2NsYXNzLmJhZGdlLWluZm8nKSBpbmZvOiBib29sZWFuO1xuICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2NsYXNzLmJhZGdlLXdhcm5pbmcnKSB3YXJuaW5nOiBib29sZWFuO1xuICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2NsYXNzLmJhZGdlLWRhbmdlcicpIGRhbmdlcjogYm9vbGVhbjtcbiAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdjbGFzcy5iYWRnZS1waWxsJykgcGlsbDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBjbGFzc0luc2lkZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNsYXNzOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2JhZGdlJyk7XG4gICAgaWYgKHRoaXMuY29sb3IpIHtcbiAgICAgIGNvbnN0IGN1c3RvbUNsYXNzQXJyID0gdGhpcy5jb2xvci5zcGxpdCgnICcpO1xuXG4gICAgICBjdXN0b21DbGFzc0Fyci5mb3JFYWNoKChlbDogc3RyaW5nKSA9PiB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsIGVsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19